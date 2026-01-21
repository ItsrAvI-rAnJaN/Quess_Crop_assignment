import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrms_lite.settings')

application = get_wsgi_application()

# ✅ AUTO-RUN MIGRATIONS ON STARTUP (Render Free workaround)
try:
    from django.core.management import call_command
    call_command('migrate', interactive=False)
except Exception as e:
    print("Migration error:", e)
