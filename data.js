export const portfolioData = {
    personal: {
        name: "Deepak Majhi",
        role: "Software Development Engineer",
        companyBadge: "SDE @ Amazon",
        heroDescription: "Software Development Engineer at <strong>Amazon</strong> with experience building and delivering scalable software systems. Passionate about system design, distributed architectures, and solving complex engineering challenges involving scale and reliability. Graduated B.Tech from <strong>NIT Jaipur</strong> (Malaviya National Institute of Technology).",
        links: {
            linkedin: "https://www.linkedin.com/in/deepak-majhi22/",
            github: "https://github.com/deepakmajhi22"
        }
    },
    experience: [
        {
            id: "stop-1",
            badge: "STOP 01 &middot; CURRENT ROLE",
            time: "Jun 2025 - Present",
            company: "Amazon SDE",
            role: "Software Development Engineer",
            location: "Hyderabad, India &middot; Hybrid",
            logoType: "amazon",
            achievements: [
                "Building scalable system solutions and optimizing critical distributed services.",
                "Designing robust workflows to handle high-throughput, low-latency business operations.",
                "Driving architectural refinements to improve data consistency, operational excellence, and service telemetry."
            ],
            tags: ["AWS Cloud Services", "Distributed Architectures", "Java / Spring", "Microservices", "System Design"],
            align: "right",
            threshold: 0.10
        },
        {
            id: "stop-2",
            badge: "STOP 02 &middot; WORK HISTORY",
            time: "Jan 2025 - Jun 2025",
            company: "Amazon SDE Intern",
            role: "Software Development Engineer Intern",
            location: "Hyderabad, India &middot; On-site",
            logoType: "amazon",
            achievements: [
                "Designed and delivered production features that improved customer-facing workflows, impacting <strong>220K+</strong> annual customer interactions.",
                "Collaborated across multiple teams and systems to drive integration and schema improvements, reducing migration effort and improving engineering efficiency.",
                "Implemented idempotent processing mechanisms for large-scale workflows, improving data reliability across millions of weekly records.",
                "Took end-to-end ownership across design, implementation, testing, rollout planning, and cross-team execution."
            ],
            tags: ["AWS ECS / Lambda", "DynamoDB", "Java", "Idempotent Processing", "Schema Integration"],
            align: "right",
            threshold: 0.40
        },
        {
            id: "stop-3",
            badge: "STOP 03 &middot; EDUCATION",
            time: "Dec 2021 - Jun 2025",
            company: "MNIT Jaipur",
            role: "Bachelor of Technology (B.Tech)",
            location: "GPA: 8.07 / 10.0",
            logoType: "graduation",
            achievements: [
                "Web Development Team Member at MNIT Alumni Community (ALCOM).",
                "Student Placement Coordinator for the 2024-25 placement cycles.",
                "DIY Coding section mentor at Think India & National Service Scheme volunteer."
            ],
            isEducation: true,
            tags: ["Data Structures", "Algorithms", "Operating Systems", "System Design", "Software Engineering"],
            align: "left",
            threshold: 0.72
        }
    ],
    skills: [
        {
            category: "Systems & Design",
            icon: "fa-solid fa-microchip",
            colorClass: "text-purple",
            fillClass: "fill-purple",
            items: [
                { name: "System Design & Scalability", percent: "95%" },
                { name: "Distributed Systems", percent: "92%" },
                { name: "Microservices & REST APIs", percent: "94%" },
                { name: "Low-Level & Object Oriented Design", percent: "90%" }
            ]
        },
        {
            category: "Languages",
            icon: "fa-solid fa-code",
            colorClass: "text-cyan",
            fillClass: "fill-cyan",
            items: [
                { name: "Java", percent: "95%" },
                { name: "C++", percent: "90%" },
                { name: "Python", percent: "88%" },
                { name: "JavaScript & SQL", percent: "85%" }
            ]
        },
        {
            category: "Tools & Cloud",
            icon: "fa-solid fa-cloud",
            colorClass: "text-purple",
            fillClass: "fill-purple",
            items: [
                { name: "Amazon Web Services (AWS)", percent: "92%" },
                { name: "React.js & Web Frontends", percent: "85%" },
                { name: "Linux Command Line", percent: "90%" },
                { name: "Git & Code Versioning", percent: "92%" }
            ]
        },
        {
            category: "SDE Foundations",
            icon: "fa-solid fa-terminal",
            colorClass: "text-cyan",
            fillClass: "fill-cyan",
            items: [
                { name: "Data Structures", percent: "95%" },
                { name: "Algorithms", percent: "94%" },
                { name: "Problem Solving", percent: "95%" },
                { name: "Software Development Lifecycle", percent: "92%" }
            ]
        }
    ],
    projects: [
        {
            title: "Flipkart GRiD 5.0 Software Track",
            tag: "Certificate of Merit",
            previewIcon: "fa-solid fa-award",
            previewTag: "FLIPKART GRID 5.0",
            glowColor: "bg-purple",
            desc: "Awarded the <strong>Certificate of Merit</strong> for qualifying in the E-Commerce Qualifier and successfully advancing to the Level 2 Submission Round. Engineered an innovative <strong>E-Commerce Recommendation System</strong> utilizing advanced algorithms to improve customer retention.",
            link: "https://github.com/deepakmajhi22",
            techTags: ["Algorithms", "E-Commerce System", "Problem Solving"]
        },
        {
            title: "Virtual Robotics Simulation",
            tag: "Robotics Intern",
            previewIcon: "fa-solid fa-robot",
            previewTag: "SPACE ROBOTICS",
            glowColor: "bg-cyan",
            desc: "Completed a Virtual Robotics Internship at <strong>SPACE</strong> (Scientific Platforms And Cosmic Explorations). Developed, constructed, and successfully ran simulation environments for advanced functional robotic designs.",
            link: "#",
            techTags: ["Robotics", "Simulation Logic", "C++ / Python"]
        },
        {
            title: "Kshitij Source Code Event",
            tag: "National Coding",
            previewIcon: "fa-solid fa-terminal",
            previewTag: "IIT KHARAGPUR",
            glowColor: "bg-purple",
            desc: "Awarded participation certificates for <strong>Source Code</strong>, a nationwide competitive coding event held during Kshitij, the annual technical fest of <strong>IIT Kharagpur</strong>, showcasing advanced logical problem-solving skills under time-critical bounds.",
            link: "#",
            techTags: ["Competitive Coding", "Algorithms", "Data Structures"]
        }
    ],
    placeholders: {
        name: "Gajala (Washington D.C.)",
        email: "gajala@sonicsolutions.com",
        subject: "Scalability Collaboration Opportunity",
        message: "Initialize conversation regarding system design..."
    }
};
