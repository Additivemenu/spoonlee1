github actions 

learning by reading its official docs



# Key takeaways

workflow file structure

```yml
workflow 
on {evnet}
	jobs 
  	job1:
  		run on {runner}
  		steps: 
				- shell script || action
		job2:
    	run on {runner}
			steps:
				- shell script || action
```







# 1. Quick start

https://docs.github.com/en/actions/quickstart



create a new repo > 

create a new file > ./github/workflows/github-actions-demo.yml

```yml
name: GitHub Actions Demo
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by GitHub!"
      - run: echo "🔎 The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v4
      - run: echo "💡 The ${{ github.repository }} repository has been cloned to the runner."
      - run: echo "🖥️ The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 This job's status is ${{ job.status }}."

```

The YAML code you've shared defines a GitHub Actions workflow. Here's a step-by-step explanation of each part:

- **`name`**: This gives the workflow a name, "GitHub Actions Demo," which is displayed on the Actions tab of the GitHub repository.

- **`run-name`**: This sets a dynamic name for each run of the workflow, which will appear in the list of workflow runs. In this case, it uses the `github.actor` context variable to insert the username of the person who initiated the run, followed by a custom message.

- **`on`**: This specifies the event that triggers the workflow, which is any `push` event to the repository.

- **`jobs`**: Defines a list of jobs that the workflow will execute. This workflow has a single job called "Explore-GitHub-Actions."
  - **`runs-on`**: Indicates that the job will run on the latest Ubuntu virtual environment provided by GitHub.
  
  - **`steps`**: Each `run` command executes a shell command on the runner, and the `uses` command uses an action. This job has several steps:
    - The first `run` command prints a message that includes the event name that triggered the workflow using the `github.event_name` context.
    - The second `run` command prints a message indicating the operating system of the runner using the `runner.os` context.
    - The third `run` command displays the branch name and repository name using the `github.ref` and `github.repository` contexts.
    - The `Check out repository code` step uses the `actions/checkout@v4` action to clone the repository's code onto the runner.
    - The next `run` command confirms that the repository has been cloned.
    - The subsequent `run` command indicates that the runner is ready to test the code.
    - The `List files in the repository` step lists the files in the repository using the `ls` command and the `github.workspace` context, which is the working directory path where GitHub Actions checks out your repository.
    - The last `run` command displays the job's status using the `job.status` context variable.

This workflow is a demonstration and does not perform any real build or test tasks. It's designed to show you some of the dynamic context variables you can use in a workflow and to familiarize you with the basics of GitHub Actions syntax and operation.





# 2. :bangbang: Understanding Github Action fundamentals

https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions



GitHub Actions is a <span style="color: yellow">continuous integration and continuous delivery (CI/CD) platform</span> that allows you to automate your build, test, and deployment pipeline. You can create workflows that build and test every pull request to your repository, or deploy merged pull requests to production.

+ of course since github actions is a cloud service, it has [bills & limits](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration) 



components of action workflow

```yml
workflow 
on {evnet}
	jobs 
  	job1:
  		run on {runner}
  		steps: 
				- shell script || action
		job2:
    	run on {runner}
			steps:
				-shell script || action
```



+ `workflow`
  + A workflow is a configurable automated process that will run one or more jobs. Workflows are defined by a YAML file checked in to your repository and will run when triggered by an event in your repository, or they can be triggered manually, or at a defined schedule.
  + <span style="color: red">Workflows are defined in the `.github/workflows` directory in a repository, (workflow yml file has to be put into this place!)</span> and a repository can have multiple workflows, each of which can perform a different set of tasks.
  + can reference a workflow within another workflow.

+ `evnet`
  + An event is a specific activity in a repository that triggers a workflow run. 

+ :bangbang:`jobs`
  + A job`is a set of *steps* in a workflow that is executed <u>on the same runner</u>. Each step is either <u>a shell script</u> that will be executed, or <u>an *action*</u> that will be run.
    + `Steps` are executed in order and are dependent on each other. Since each step is executed on the same runner, you can share data from one step to another. For example, you can have a step that builds your application followed by a step that tests the application that was built. 

+ :bangbang: `action`
  + An *action* is a custom application for the GitHub Actions platform that performs a complex but frequently repeated task. Use an action to help reduce the amount of repetitive code that you write in your workflow files. 
  + e.g. actions
    + `actions/checkout `
      + This is an action that checks out your repository onto the runner, allowing you to run scripts or other actions against your code (such as build and test tools). You should use the checkout action any time your workflow will use the repository's code.

+ `runner`
  + A runner is a server that runs your workflows when they're triggered. Each runner can run a single job at a time. 
    + GitHub provides Ubuntu Linux, Microsoft Windows, and macOS runners to run your workflows; each workflow run executes in a fresh, newly-provisioned virtual machine. 



# 3. More advanced features

https://docs.github.com/en/actions/learn-github-actions/finding-and-customizing-actions



## Find & customize actions

https://docs.github.com/en/actions/learn-github-actions/finding-and-customizing-actions





## Programmatic features

https://docs.github.com/en/actions/learn-github-actions/essential-features-of-github-actions



### Expressions



### Context



### Variables



# 4. Use Cases

https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#next-steps



using starter workflows

https://docs.github.com/en/actions/learn-github-actions/using-starter-workflows



## 4.1 :bangbang: automating building and testing 

https://docs.github.com/en/actions/automating-builds-and-tests





## 4.2 publishing the package

https://docs.github.com/en/actions/publishing-packages



## 4.3 :bangbang: deployment

https://docs.github.com/en/actions/deployment



### deploy on AWS

https://docs.github.com/en/actions/deployment/deploying-to-your-cloud-provider/deploying-to-amazon-elastic-container-service





## 4.4 managing issues and PR

https://docs.github.com/en/actions/managing-issues-and-pull-requests



