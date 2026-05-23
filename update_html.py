import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace script tag
content = re.sub(r'<script src="script\.js"></script>', '<script type="module" src="script.js"></script>', content)

# Replace Experience Stations
experience_pattern = re.compile(r'<!-- Stop 1.*?</div>\s*(?=</div>\s*</section>)', re.DOTALL)
content = experience_pattern.sub('<!-- Stations dynamically injected by script.js -->\n                <div id="dynamic-stations-container" style="display: contents;"></div>\n            ', content)

# Replace Skills
skills_pattern = re.compile(r'<!-- Category 1: Systems & Architecture -->.*?(?=</div>\s*</section>)', re.DOTALL)
content = skills_pattern.sub('<!-- Skills dynamically injected by script.js -->\n            ', content)

# Replace Projects
projects_pattern = re.compile(r'<!-- Achievement 1: Flipkart GRiD -->.*?(?=</div>\s*</section>)', re.DOTALL)
content = projects_pattern.sub('<!-- Projects dynamically injected by script.js -->\n            ', content)

with open('index.html', 'w') as f:
    f.write(content)

