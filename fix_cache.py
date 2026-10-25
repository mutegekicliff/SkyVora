import os
import glob

def bust_cache():
    html_files = glob.glob("*.html")
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace styles.css with styles.css?v=2.0
        # First remove any existing query params to avoid styles.css?v=1.1?v=2.0
        import re
        content = re.sub(r'assets/css/styles\.css(\?v=[0-9.]+)?', 'assets/css/styles.css?v=2.0', content)
        content = re.sub(r'assets/js/main\.js(\?v=[0-9.]+)?', 'assets/js/main.js?v=2.0', content)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print(f"Updated {len(html_files)} files with cache buster.")

if __name__ == '__main__':
    bust_cache()
