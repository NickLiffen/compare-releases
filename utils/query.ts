import { graphql } from '@octokit/graphql';

const query = async (owner: string, repo: string, token: string): Promise<queryFunctionResponse> => {
  try {
    const {
      repository: {
        releases: { nodes: releases },
      },
    } = (await graphql({
      query: `query lastIssues($owner: String!, $repo: String!) {
        repository(owner:$owner, name:$repo) {
          releases(last: 1, orderBy: {field: CREATED_AT, direction: ASC}) {
            nodes {
              isLatest
              isPrerelease
              createdAt          
            }
          }
        }
      }`,
      owner,
      repo,
      headers: {
        authorization: `token ${token}`,
      },
    })) as queryResponse;
    if (releases.length === 0) {
      return { createdAt: null, isLatest: true, isPrerelease: false };
    }
    return releases[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default query;
