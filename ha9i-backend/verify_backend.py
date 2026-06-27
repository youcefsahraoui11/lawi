# Verification script for Django REST Framework Backend
import os
import sys

def verify():
    print("----- HA9I BACKEND SELF-CHECK -----")
    print("Checking directory configuration...")
    
    apps = ['authentication', 'complaints', 'lawyers', 'resources', 'chat']
    missing_apps = []
    
    for app in apps:
        if not os.path.exists(app):
            missing_apps.append(app)
            
    if missing_apps:
        print(f"❌ Error: Missing app directories: {', '.join(missing_apps)}")
        sys.exit(1)
        
    print("✅ All Django app directories exist.")
    print("Checking Django project configuration files...")
    
    core_files = [
        'ha9i_backend/settings.py',
        'ha9i_backend/urls.py',
        'ha9i_backend/wsgi.py',
        'manage.py'
    ]
    
    missing_files = []
    for file in core_files:
        if not os.path.exists(file):
            missing_files.append(file)
            
    if missing_files:
        print(f"❌ Error: Missing configuration files: {', '.join(missing_files)}")
        sys.exit(1)
        
    print("✅ Core configuration files verified.")
    print("Backend architecture structures validated successfully.")
    print("-----------------------------------")

if __name__ == '__main__':
    verify()
