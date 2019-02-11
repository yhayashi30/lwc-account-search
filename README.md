# Lightning Web Components Sample(Account Search)
## Demo
![demo](https://s3-ap-northeast-1.amazonaws.com/yhayashi30/demo_gif/lwc-search-account_demo.gif)

## Description of **lwc-account-search**
lwc-account-search is a screen that displays a form for searching account and a list of results using Lightning Web Component.

## Installing Account Search using Salesforce DX

1. Set up your environment. 
  - Sign up for a Spring '19 pre-release org and enable Dev Hub
  - Install the pre-release version of the Salesforce CLI
  - Install Visual Studio Code
  - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authenticate with your Spring '19 hub org and provide it with an alias (spring19hub):

  ```
  sfdx force:auth:web:login -d -a spring19hub
  ```

3. Clone the lwc-account-search repository:

  ```
  git clone https://github.com/yhayashi30/lwc-account-search
  cd lwcAccountSearch
  ```

4. Create a scratch org and provide it with an alias (**lwc-account-search** in the command below):

  ```
  sfdx force:org:create -s -f config/project-scratch-def.json -a lwc-account-search
  ```

5. Push the app to your scratch org:

  ```
  sfdx force:source:push
  ```

6. Assign the **AccountSearch** permission set to the default user:

  ```
  sfdx force:user:permset:assign -n AccountSearch
  ```

7. Load sample data:

  ```
  sfdx force:data:tree:import --plan ./data/data-plan.json
  ```

8. Open the scratch org:

  ```
  sfdx force:org:open
  ```

9. In App Launcher(All Items), select the **AccountSearch** Item.

## Reference
https://github.com/trailheadapps/lwc-recipes