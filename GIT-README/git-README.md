```markdown
# My Project

Welcome to my project! This README.md file provides instructions for common Git operations you might need while working on this project.

## Committing Changes from Terminal

To commit your changes to the repository from the terminal:

1. Stage your changes:
   ```bash
   git add .
   ```

2. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Your commit message"
   ```

3. Push your changes to GitHub:
   ```bash
   git push origin <branch-name>
   ```

Replace `<branch-name>` with the name of your current branch.

## Creating a New Branch from Terminal

To create a new branch from the terminal:

```bash
git checkout -b <new-branch-name>
```

This command creates a new branch named `<new-branch-name>` and switches to it.

## Getting Latest Changes and Checking Out Branches

To get the latest changes from the main branch and switch to a specific branch:

```bash
git fetch origin main
git checkout <branch-name>
```

This will fetch the latest changes from the main branch and checkout the specified branch.

## Making a Pull Request (PR)

To create a pull request from the terminal:

```bash
git push origin <branch-name>
```

Then, go to your repository on GitHub and create a pull request from `<branch-name>` to the desired target branch.

## Merging Main into Your Branch

To merge the main branch into your current branch:

```bash
git checkout <your-branch>
git merge origin/main
```

This will merge the latest changes from the main branch into your current branch. Resolve any conflicts if necessary and commit the changes.

## Conclusion

You now have the basic Git commands to work with this project on GitHub. Happy coding!
```
