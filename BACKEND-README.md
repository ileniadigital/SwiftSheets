Sure, here's the content for your Markdown document:

```markdown
## Setting Up Backend Environment

### Backend Directory Setup:

1. Open terminal in Visual Studio Code.
2. Navigate to the backend directory:
   ```
   cd backend
   ```

### Creating Virtual Environment:

#### For Windows:
```bash
python -m venv env
env\Scripts\activate
```

#### For macOS:
```bash
python3 -m venv env
source env/bin/activate
```

### Installing Required Modules:
```bash
pip install -r requirements.txt
```

### Migration Steps:

1. Make migrations:
   ```bash
   python manage.py makemigrations
   python manage.py makemigrations myapp  
   ```

2. Apply migrations:
   ```bash
   python manage.py migrate
   ```

### create super user
'''bash
python manage.py createsuperuser
'''
then enter your details
Once the server loads you must login with your details

You will not have any data in your DB so add them manually unless i figure out a way to send the dummy data

### Running the Backend Server:
```bash
python manage.py runserver
```
```

