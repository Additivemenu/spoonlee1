# 1. 单线: clone, add, commit, push

1.	Create a GitHub repo called ‘jr-git-intro’ and clone it to your local.
2.	Inside your local repo, create a new file called ‘first.md’ and add some text to it. Commit the change to your local using the commit message “JR-101: Set up the first file”.
3.	Push the branch (master) to your remote.
4.	Create two other files ‘second.md’ and ‘third.md’. Add some text to it. Commit the change using the commit message “JR-102: Set up the second and third file”.
5.	Remove ‘third.md’ and commit the change using the commit message “JR-103: Refactor and clean up redundant code”.

---
# 2. 双线: branch & merge locally

6.	Create a branch called bugfix/JR-104-fix-words-in-second-file
    + `git checkout -b <branch_name>`
7.	In this new branch, change the first line of ‘second.md’ to something else. Commit the change with the message “JR-104: Modify first line of second file”
8.	Switch back to master branch, make a commit to change the first line of ‘second.md’ to something different to what you did in Step 7. Commit the change with the message “JR-105: Modify first line of second file in a different way”.
9.	Merge branch bugfix/JR-104-fix-words-in-second-file into master. Resolve the conflicts to accept changes in the bugfix branch. 
    + auto merge failed
10.	Delete the bugfix branch and push the new commits in master to GitHub.
    + `git branch -d <branch_name>`

---

11.	Check out branch feature/JR-106-create-home-page, add a new file ‘index.html’ with Home Page in the code. Commit the change with message “JR-106: Create the home page”
12.	Check out master branch, add a new file ‘index.html’ with About in the code. Commit the change with message “JR-107: Create the about section”. Push the new commit to GitHub. 
    + Note this is to simulate changes made by your colleague. In your work, it’s rare that you will ever need to work in the master branch. 

---
# 3. 多线: merge remotely

13.	Push the new branch feature/JR-106-create-home-page to remote and make a **pull request** into master on GitHub. Make sure you write meaningful pull request title.
    + cannot auto merge 
14.	Use the **git rebase** to resolve merge conflicts and result in a *fast-forward merge* in the remote repository.
    
# 到这儿
15.	Merge the PR and delete the feature branch.

---
# 4. At last 
16.	Pull the latest change in master to your local
17.	Provide a graphic history of your current local Git repo. Take a screenshot of it and put it in your Git repo. Commit the change in master with message “JR-108: Add screen shot”and push it to GitHub.
18.	Add the url to your GitHub Repo in the excel spreadsheet provided.
19.	Happy Coding!!!
