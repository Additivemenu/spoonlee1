

tutorial: https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing





# workflow



Using `git rebase` in a development team can help maintain a clean and linear history. Here's a typical workflow for merging your code into the development branch using rebase:

1. **Update Your Local Development Branch:**
   Before you start working on your feature, make sure your local `development` branch is up-to-date with the remote `development` branch.

   ```bash
   git checkout development
   git pull origin development
   ```

2. **Create a New Feature Branch:**
   Create a new branch for your feature from the updated `development` branch.

   ```bash
   git checkout -b feature/my-feature
   ```

3. **Make Your Changes:**
   Make your changes, commit them to your feature branch, and push them to the remote repository.

   ```bash
   git add .
   git commit -m "Add my feature"
   git push origin feature/my-feature
   ```

4. :bangbang: ​**Rebase Your Feature Branch:**
   Before merging your changes into the `development` branch, rebase your feature branch onto the latest `development` branch. This ensures that your feature branch has a linear history relative to the `development` branch.

   ```bash
   git fetch origin
   git rebase origin/development
   ```

   If you encounter any conflicts during the rebase, resolve them and continue the rebase:
   ```bash
   git add .
   git rebase --continue
   ```

5. **Test Your Changes:**
   After rebasing, it's important to test your changes again to ensure that everything works as expected.

6. :bangbang: ​**Push Your Changes:**
   Once you've tested your changes and are ready to merge, push your rebased feature branch to the remote repository. You may need to force-push if you've rewritten history during the rebase => so be careful and never do git rebase on a public branch

   ```bash
   git push origin feature/my-feature --force
   ```

7. **Create a Pull Request:**
   Create a pull request from your feature branch to the `development` branch on the remote repository. Your team can review the changes before merging.

8. :star: ​**Squash Commits (optional):**  (<span style="color:yellow">this step could also be done via github desktop</span>)
   Start an interactive rebase to squash your commits. For example, to squash the last 3 commits:

   ```bash
   git rebase -i HEAD~3
   ```

   In the interactive rebase editor, change `pick` to `squash` for the commits you want to squash (all but the first one):

   ```
   pick 1234567 First commit message
   squash 2345678 Second commit message
   squash 3456789 Third commit message
   ```

   Save and close the editor. Git will combine the specified commits into one.

   + then **Create a New Commit Message:**
     Git will open a new editor window for you to write a commit message for the squashed commit. Write a message that summarizes the changes, save, and close the editor.

9. **Merge the Pull Request:**
   Once the pull request is approved, merge it into the `development` branch. Depending on your team's workflow, you may use a merge commit, squash merge, or rebase and merge.

By following this workflow, you can ensure that your feature branch is up-to-date with the `development` branch and maintain a clean commit history.





check log history

```shell
git log --graph --oneline --decorate
```







# notes

:bangbang: ​Golden rule of git rebase: never run `git rebase` on a public branch as git rebase re-write the history on the branch! 



what happens if I run `git rebase main` on my feature branch?

---

on my featuer branch do: rebase my feature branch onto the main branch (no change made to main branch, this only re-write the history on my feature branch, its basement is changed) -> move commits on my branch onto the tip of the main branch



When you run `git rebase main` while on your feature branch, you are essentially saying:

1. **"Take all the commits that are on my feature branch but not on the main branch..."**
   - This means it looks at the commits that are unique to your feature branch.
2. **"...and replay them (reapply them) on top of the tip of the main branch."**
   - It takes those commits and applies them one by one to the latest commit on the main branch. This creates a new set of commits that have the same changes as your original feature branch but are now based on the latest state of the main branch.

This process is called "rebasing" because you are changing the base commit that your feature branch is built on. The end result is a linear history where your feature branch commits come right after the latest commit on the main branch.

After the rebase, your feature branch will have a cleaner, more straightforward history, which can be easier to merge into the main branch later. However, rebasing can rewrite commit history, so it's generally recommended to only rebase branches that haven't been shared with others or pushed to a public repository.





Running **`git rebase main`** while on your feature branch <span style="color:red">will rewrite the history of your feature branch but will not make any changes to the main branch</span>.

Here's what happens:

1. Rewriting History of Feature Branch:
   - The rebase operation takes the commits from your feature branch that are not in the main branch and reapplies them on top of the tip of the main branch. This creates new commit IDs for these commits, effectively rewriting the history of your feature branch.
2. No Changes to Main Branch:
   - The main branch remains unchanged during this process. The rebase operation only affects the feature branch.

After the rebase, your feature branch will have a linear history that builds directly on top of the main branch, making it easier to merge back into the main branch later. However, since the history of the feature branch is rewritten, it's important to be cautious if the branch has been shared with others or pushed to a remote repository. In such cases, you may need to force-push the rebased branch (**`git push --force`**) and communicate with your team about the change.