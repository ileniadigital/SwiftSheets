# Installation Guide

This guide provides step-by-step instructions for installing Python, pip, and Django on your system, as well as adding Python to the system PATH.

## Installing Python

1. **Download Python**: 
   - Visit the [Python official website](https://www.python.org/downloads/).
   - Download the latest version of Python for your operating system.

2. **Run the Installer**:
   - Double-click the downloaded Python installer file.
   - Follow the installation wizard's instructions.
   - Ensure to check the box that says "Add Python X.X to PATH" during installation.

3. **Verify Installation**:
   - Open a command prompt (Windows) or terminal (macOS/Linux).
   - Run the following command to check if Python is installed:
     ```
     python --version
     ```

## Installing pip

1. **Download get-pip.py**:
   - Visit the [pip installation page](https://pip.pypa.io/en/stable/installation/).
   - Right-click on the link "get-pip.py" and save it to your computer.

2. **Run the Installer**:
   - Open a command prompt (Windows) or terminal (macOS/Linux).
   - Navigate to the directory where you saved get-pip.py.
   - Run the following command:
     ```
     python get-pip.py
     ```

3. **Verify Installation**:
   - Run the following command to check if pip is installed:
     ```
     pip --version
     ```

## Installing Django

1. **Install Django**:
   - Open a command prompt (Windows) or terminal (macOS/Linux).
   - Run the following command to install Django:
     ```
     pip install django
     ```

2. **Verify Installation**:
   - Run the following command to check if Django is installed:
     ```
     python -m django --version
     ```

## Adding Python to the System PATH

1. **Open System Properties**:
   - Right-click on "This PC" (Windows) or "My Computer" (Windows 7) and select "Properties".
   - Click on "Advanced system settings" in the left sidebar.

2. **Open Environment Variables**:
   - In the System Properties window, click on the "Environment Variables" button.

3. **Edit System PATH**:
   - In the Environment Variables window, find the `Path` variable under "System variables" and select it.
   - Click on the "Edit" button.

4. **Add Python to PATH**:
   - Click on the "New" button and add the path to your Python installation directory (usually `C:\PythonXX`, where `XX` represents the Python version).
   - Click "OK" to save the changes.

5. **Verify PATH Configuration**:
   - Open a new command prompt (Windows) or terminal (macOS/Linux).
   - Run the following command to check if Python is added to the PATH:
     ```
     python --version
     ```
