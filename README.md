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
| destinationOrganisation | The organisation of the repository you need to check the release for.  | true      |
| destinationRepository   | The repository you need to check the release for.                      | true      |
| sourceOrganisation      | Normally, the organisation of the repository this action will run in.  | true      |
| sourceRepository        | Normally, the repository this action will run in.                      | true      |
| token                   | A token which has access to the `repo` scope                           | true      |


Thinking of it in `git` terms. The `destination*` is the `base` branch, and the `source` is the `compare` branch. 

## Outputs

It will output a json structured object following this format:

```
{
    "status": number<200|500>,
    "body": string,
    "latestReleaseRepo": string<dest*Org*/dest*Repo|source*Org*/source*Repo> | null,
    "shortAnswer": string<source|destination> | null,
}
```

If there has been any error, the `status` will equal `500`. On any success, it will response with `200`. 

The `body` is a messaging explaining the outcome of the query. 

The `latestReleaseRepo` is the `org/repo` combined  of the repository which released latest. E.G the repo with the "newest" release.  If there is an error, and a `500` is present, it will return `null`. 

The `shortAnswer` will return either `source` or `destination`. If the `destination` repository has the "newest" release, it will return `destination`. If the `source` repository has the "newest" release, it will return `source`. 
## Example usage

### Workflow steps

```yaml
- name: Compare The Latest Releases Between Two Repositories
  uses: NickLiffen/compare-releases@v1
  with:
    repository: EliLillyCo
    organisation: .github
    token: ${{ secrets.GITHUBREADONLY }}
```

### Responses

#### Successful Response

For example, a success response will look  like:

```json
{
    "status": 200,
    "body": "destnation release > source release",
    "latestReleaseRepo": "NickLiffen/destinationRepo",
    "shortAnswer": "destination",
};
```

#### Failure Response

For example, a falure response will look  like:

```json
{
    "status": 500,
    "body": "ah man! There has been an error! Look through the logs to see what you find. Please log an issue if this is something with the action",
    "latestReleaseRepo": null,
    "shortAnswer": null,
};
```
## Contribution

Contributions are welcome! Log an issue and lets chat.