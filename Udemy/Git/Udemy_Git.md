References:

:book: [jr git](JR_Git/myGit.md)



vscode: git Lens extension

https://git-scm.com/docs





## review other's updates

Switching between branches to review updates from teammates is a common practice when working on a team project using Git. Here's how you can do that:

1. **Stash Your Changes (if needed):** 
   - If you have uncommitted changes in your current branch, you'll need to stash them before switching to another branch. This can be done with the following command:
     ```bash
     git stash
     ```

2. **Fetch Latest Updates:**
   - It's a good practice to fetch the latest updates from the remote repository to ensure you have the most recent version of all branches:
     ```bash
     git fetch
     ```

3. **Checkout the Desired Branch:**
   - Now, switch to the branch you want to review. Replace `branch-name` with the name of the branch you want to switch to:
     ```bash
     git checkout branch-name
     ```

4. **Review Updates:**
   - With the desired branch checked out, you can now review the updates made by your teammates. 

5. **Return to Your Branch:**
   - Once you've finished reviewing, you can switch back to your original branch using the checkout command again. 
     ```bash
     git checkout your-branch-name
     ```

6. **Apply Stashed Changes (if needed):**
   - If you stashed any changes earlier, you can reapply them to your branch with the following command:
     ```bash
     git stash pop
     ```

Make sure to communicate with your team and follow any project-specific branching and reviewing protocols your team has established.



## git fetch vs. git pull

`git fetch` and `git pull` are commands used in Git to update the local version of a repository from a remote repository. Here's how they differ:

1. **`git fetch`:**
   - This command downloads the latest data from the remote repository (like branches and commits) but doesn't integrate any new data into your working files. In other words, it doesn't alter your current working state, making it a safe operation that won't interfere with your current work. 
   - It's especially useful when you want to see what's been updated on the remote repository, without making any changes to your local repository.

2. **`git pull`:**
   - This command essentially is a combination of `git fetch` followed by `git merge`. It fetches the latest updates from the remote repository and automatically merges the new data with your current working branch.
   - A `git pull` is a way to both update your local repository and integrate these updates into your work, making it a quick way to catch up with changes from the rest of your team.

In a team setting, it's often advisable to use `git fetch` to first review the updates made by others, and then decide how and when to integrate these updates using `git merge` or `git rebase`. This approach can help prevent merge conflicts and other issues that might arise from automatically merging with `git pull`.





## contents

| Class                      | Topic                              | Description |
| :------------------------- | ---------------------------------- | ----------- |
| 2                          |                                    |             |
| 3                          | Installation & Setup               |             |
| 4                          | Basics of Git: Adding & Committing |             |
| 5                          | Commits in detail                  |             |
| :star: [6](./C6/readme.md) | Working with Branches              |             |
| :star: [7](./C7/readme.md) | Merging Branches                   |             |
| :star: 8                   | Comparing Changes with Git Diff    |             |
| 9                          | The Ins and Outs of Stashing       |             |
| :star: 10                  | Undoing Changes & Time Travelling  |             |





| Class                        | Topic                                          | Description |
| ---------------------------- | ---------------------------------------------- | ----------- |
| 11                           | Github                                         |             |
| 12                           | Fetching & Pulling                             |             |
| 13                           | Github Grab Bag: Odds & Ends                   |             |
| :star: [14](./C14/README.md) | Git collaboration workflows                    |             |
| :star: [15](./C15/README.md) | Rebasing                                       |             |
| :star: [16](./C16/README.md) | Cleaning up History with interactive Rebase    |             |
| 17                           | Git Tags: Marking important Moments in History |             |





|      |                                               |      |
| ---- | --------------------------------------------- | ---- |
| 18   | Git Behind the scenes - Hashing & Objects     |      |
| 19   | The power of Reflogs - Retrieving "Lost" work |      |
| 20   | Written Custom Git Aliases                    |      |

