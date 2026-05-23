import re

with open('script.js', 'r') as f:
    content = f.read()

# Add import at the top
import_stmt = "import { portfolioData } from './data.js';\n\n"

# The dynamic rendering logic
render_logic = """
    // --- 0. DYNAMIC CONTENT INJECTION ---
    
    // 0.1 Update Contact Placeholders
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    if (nameInput) nameInput.placeholder = portfolioData.placeholders.name;
    if (emailInput) emailInput.placeholder = portfolioData.placeholders.email;
    if (subjectInput) subjectInput.placeholder = portfolioData.placeholders.subject;
    if (messageInput) messageInput.placeholder = portfolioData.placeholders.message;

    // 0.2 Render Experience Stations
    const stationsContainer = document.getElementById('dynamic-stations-container');
    if (stationsContainer) {
        let stationsHTML = '';
        portfolioData.experience.forEach(exp => {
            const logoSvg = exp.logoType === 'amazon' 
                ? `<div class="amazon-logo-wrapper"><svg viewBox="0 0 24 24"><path d="M 4 15 Q 12 21 20 15" fill="none" stroke="#f97316" stroke-width="2.8" stroke-linecap="round"/><path d="M 17 14 L 20 15 L 18 18" fill="none" stroke="#f97316" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>` 
                : `<i class="fa-solid fa-graduation-cap brand-icon"></i>`;
            
            let achievementsHTML = '';
            if (exp.isEducation) {
                achievementsHTML = `<div class="role-achievements" style="font-size: 0.9rem; margin-top: 10px;"><strong>Involvement:</strong><ul style="list-style-type: circle; padding-left: 20px; margin-top: 5px; color: var(--text-secondary);">` + exp.achievements.map(a => `<li>${a}</li>`).join('') + `</ul></div>`;
            } else {
                achievementsHTML = `<ul class="role-achievements" style="margin-top: 10px;">` + exp.achievements.map(a => `<li>${a}</li>`).join('') + `</ul>`;
            }

            const tagsHTML = `<div class="tech-tags">` + exp.tags.map(t => `<span class="tech-tag">${t}</span>`).join('') + `</div>`;

            stationsHTML += `
                <div class="highway-station ${exp.align}-station ${exp.id} scroll-reveal" data-threshold="${exp.threshold}">
                    <div class="station-glow-hub"></div>
                    <div class="station-card glass-panel">
                        <div class="station-header">
                            <span class="station-badge">${exp.badge}</span>
                            <span class="station-time">${exp.time}</span>
                        </div>
                        <div class="company-brand">
                            ${logoSvg}
                            <span class="company-name">${exp.company}</span>
                        </div>
                        <h3 class="role-title">${exp.role}</h3>
                        <span class="role-location">${exp.isEducation ? exp.location : `<i class="fa-solid fa-location-dot"></i> ${exp.location}`}</span>
                        ${exp.isEducation ? `<p class="role-desc" style="margin-top: 10px;">Acquired rigorous engineering expertise. Focused on Data Structures, Algorithms, Operating Systems, Graph Theory, System Design, and Software Engineering principles.</p>` : ''}
                        ${!exp.isEducation && exp.achievements.length === 3 ? `<p class="role-desc" style="margin-top: 10px;">${exp.achievements.join(' ')}</p>` : achievementsHTML}
                        ${tagsHTML}
                    </div>
                </div>
            `;
        });
        stationsContainer.innerHTML = stationsHTML;
    }

    // 0.3 Render Skills Grid
    const skillsContainer = document.querySelector('.skills-grid');
    if (skillsContainer && portfolioData.skills) {
        let skillsHTML = '';
        portfolioData.skills.forEach(category => {
            let itemsHTML = category.items.map(item => `
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">${item.name}</span>
                        <span class="skill-percent">${item.percent}</span>
                    </div>
                    <div class="skill-bar-bg">
                        <div class="skill-bar-fill ${category.fillClass}" style="width: 0%"></div>
                    </div>
                </div>
            `).join('');

            skillsHTML += `
                <div class="skills-category glass-panel scroll-reveal">
                    <div class="category-header">
                        <i class="${category.icon} category-icon ${category.colorClass}"></i>
                        <h3>${category.category}</h3>
                    </div>
                    <div class="skills-list">
                        ${itemsHTML}
                    </div>
                </div>
            `;
        });
        skillsContainer.innerHTML += skillsHTML;
    }

    // 0.4 Render Projects Grid
    const projectsContainer = document.querySelector('.projects-grid');
    if (projectsContainer && portfolioData.projects) {
        let projectsHTML = '';
        portfolioData.projects.forEach(project => {
            let techBadges = project.techTags.map(tag => `<span>${tag}</span>`).join('');
            
            projectsHTML += `
                <div class="project-card glass-panel scroll-reveal">
                    <div class="project-image-container">
                        <div class="project-glow-bg ${project.glowColor}"></div>
                        <div class="project-placeholder-preview">
                            <i class="${project.previewIcon} project-preview-icon"></i>
                            <span class="project-preview-tag">${project.previewTag}</span>
                        </div>
                    </div>
                    
                    <div class="project-info">
                        <div class="project-header">
                            <span class="project-tag">${project.tag}</span>
                            <div class="project-links">
                                <a href="${project.link}" target="_blank" rel="noopener noreferrer"><i class="${project.link.includes('github') ? 'fa-brands fa-github' : 'fa-solid fa-up-right-from-square'}"></i></a>
                            </div>
                        </div>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-desc">${project.desc}</p>
                        <div class="project-tech-badges">
                            ${techBadges}
                        </div>
                    </div>
                </div>
            `;
        });
        projectsContainer.innerHTML += projectsHTML;
    }
"""

content = import_stmt + content
content = content.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\n" + render_logic)

with open('script.js', 'w') as f:
    f.write(content)

