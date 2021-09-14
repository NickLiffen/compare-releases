# Compare Releases Across Repositories

This action compares two repositories, specifically the latest release. It will return data on which repository has released last. 

The latest release is defined as when the `createdAt` timestamp is placed on the releases. E.g. when the release gets published. 

Purposes when this may be useful:

- You are trying to keep in sync across two repositories. 
- You don't have access to programmatically subscribe to webhooks of a public repository, so you need to cron and check when the last time a release was made on a repository. 
- You need to trigger a workflow/pipeline/script when your repository is behind in a release.

The initial motivation for this repository was to be kept updated when a new release of a CLI tool got released, so we could make it into a container and keep that container updated with the latest version of the release. We didn't have access to webhooks on the repository, so doing this seemed the best approach without building a super complex solution. 

## Inputs

Please see the table below for the inputs. All are required.

| Input Name              | Description                                                            | Required? |
|-------------------------|------------------------------------------------------------------------|-----------|
| destinationRepository   | The repository you need to check the release for. Format. `Org/Repo`   | true      |
| sourceRepository        | Normally, the repository this action will run in. Format. `Org/Repo`   | true      |
| token                   | A token which has access to the `repo` scope                           | true      |


Thinking of it in `git` terms. The `destination*` is the `base` branch, and the `source` is the `compare` branch. 

## Outputs

There are two outputs. `repo` and `tagName`. 

The `repo` output is a string structured as the repository which has the latest release. 

The `tagName` output is a string structured as the latest tag on the destination repository.

To access these outputs you can do something as such: 

```
${{ steps.compare-releases.outputs.repo }}
${{ steps.compare-releases.outputs.tagName }}
```

The `repo` is formated in this string format:

```
OrgName/RepoName e.g. GitHub/octokit
```

If there has been any error, an error will be thrown and the action will fail with an appropriate error message. 

## Example usage

### Workflow steps

```yaml
- name: Compare The Latest Releases Between Two Repositories
  uses: NickLiffen/compare-releases@v1
  with:
    destinationRepository: GitHub/fetch
    sourceRepository: NickLiffen/GSSAR
    token: ${{ secrets.GITHUBREADONLY }}
```

The above example workflow will compare and see if the `destinationRepository` of `GitHub/fetch` has a newer release then the `sourceRepository` of `NickLiffen/GSSAR`. It will return whatever repository has a newer release. 

## Contribution

Contributions are welcome! Log an issue and lets chat.