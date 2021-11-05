# Pavilion
With the pandemic prohibiting students from attending onsite, organizations have been encountering a difficult time transitioning to the online setting with their events, internal processes and engagements. Pavilion aims to solve this by becoming the all in one platform for student organizations in the Ateneo de Manila University. 

## Getting Started
1. Run 
    ```bash
    python manage.py runserver --settings=dev_settings
    ```
    this is done to run the django local server (ensure that you are in the main pavilion directory)

2. open a new terminal and cd to the frontend directory
    ```bash
    cd frontend
    ```
3. In the new terminal run 
    ```bash
    npm run dev
    ```
    this is done to run the frontend react server


### Prerequisites
* Python
* NodeJS


### Installation
Step by step installation guide

#### 1. Python

* Installing through the website: https://www.python.org/

* Installing through conda: https://docs.conda.io/en/latest/

#### 2. NodeJS
* Install through Node Version Manager: NVM (recommended)
    * For Windows machines, follow the installation docs and install node version 14.17.3:
        https://github.com/coreybutler/nvm-windows#install-nvm-windows

    * For Linux machines, follow the installation guide and install node version 14.17.3:
        https://github.com/nvm-sh/nvm#about

* Install through the official website (install version 14.17.3):
    * https://nodejs.org/en/download/releases/

#### 3. Install all required dependencies
* Python dependencies
    1. We recommend that you use a virtual environment (see command below to create one)
        ```bash
        python -m venv <name of virtualenv>
        ```
    2. Activate your virtual environment (ensure that this is activated when installing or running your environment
        ```bash
        <virtuelenv>/scripts/activate
        ```
    3. By using pip install, all dependencies in the requirements.txt file can be installed automatically.
        ```bash
        pip install -r requirements.txt
        ```
* NodeJs
    1. cd to the frontend directory
        ```bash
        cd frontend
        ```
    2. install the npm dependencies
        ```bash
        npm install
        ```

## Creating and activating the Development Environment
Step by step process of how to setup the Development environment

### Local Machine
1. Start your virtual environment (only if you have a virtual environment)
    ```bash
    <virtualenv>/scripts/activate
    ```
2. Run the django server (ensure you are in the main directory (ex: C:/users/jing/projects/pavilion)
    ```bash
    <virtualenvironment>/scripts/activate
    ```
3. Open a new terminal and cd to the frontend directory (ex: C:/users/jing/projects/pavilion/frontend)
    ```bash
    cd frontend
    ```
4. Run the react development environment
    ```bash
    npm run dev
    ```
5. Open localhost:8000 to see make sure the website is running!

**Congratulations! You have set up your Development environment!**

## Built with
* Django - Backend
* React - Frontend
* Heroku - Deployment
* Cotter - authentication

## Authors
* Franz Taborlupa
* Paolo Ramos
* Gio Divino
