const compare = async (
  destinationResponse: queryFunctionResponse,
  sourceResponse: queryFunctionResponse,
  destination: destination,
  source: source,
): Promise<compareResponse> => {
  if (destinationResponse.createdAt === null) {
    console.log(
      `There are no release(s) on the following repository: ${destination.destinationOrganisation}/${destination.destinationRepository}. Nothing to compare`,
    );
    return {
      status: 500,
      body: `There are no release(s) on the following repository: ${destination.destinationOrganisation}/${destination.destinationRepository}. Nothing to compare`,
      latestReleaseRepo: null,
      shortAnswer: null,
    };
  }

  /* Maybe this logic could be changed (pre-release)? Basically if this isn't the latest release I would guess it's something wrong with my query */

  if (!destinationResponse.isLatest || destinationResponse.isPrerelease) {
    console.log(
      `The latest release of ${destination.destinationOrganisation}/${destination.destinationRepository} repository is either a pre-release of not the latest version. eek!`,
    );
    return {
      status: 500,
      body: `The latest irelease of ${destination.destinationOrganisation}/${destination.destinationRepository} repository is either a pre-release of not the latest version. eek!`,
      latestReleaseRepo: null,
      shortAnswer: null,
    };
  }

  /* Maybe this logic could be changed (pre-release)? Basically if this isn't the latest release I would guess it's something wrong with my query */

  if (!sourceResponse.isLatest || sourceResponse.isPrerelease) {
    console.log(
      `The latest release of ${source.sourceOrganisation}/${source.sourceRepository} repository is either a pre-release of not the latest version. eek!`,
    );
    return {
      status: 500,
      body: `The latest release of ${source.sourceOrganisation}/${source.sourceRepository} repository is either a pre-release of not the latest version. eek!`,
      latestReleaseRepo: null,
      shortAnswer: null,
    };
  }

  /* Printing out the timestamps for people can manualy validate if they like */

  console.log(`The timestamp of the destination repository is: ${destinationResponse.createdAt}`);
  console.log(`The timestamp of the source repository is: ${sourceResponse.createdAt}`);

  /* If there is a release in the destination, but not the source, tedhnically the source is beheind, which means we are going to report back true  */

  if (!sourceResponse.createdAt && destinationResponse.createdAt) {
    console.log(
      'There is no release on the source repository, but there is one on the release, destination repo ahead.',
    );
    return {
      status: 200,
      body: 'no release on source, but there is one on the release',
      latestReleaseRepo: `${destination.destinationOrganisation}/${destination.destinationRepository}`,
      shortAnswer: 'destination',
    };
  }

  /* Converting to timestamps for conversation  */

  const sourceCreatedAtTimestamp = sourceResponse.createdAt ? new Date(sourceResponse.createdAt) : new Date();
  const destinationCreatedAtTimestamp = sourceResponse.createdAt ? new Date(sourceResponse.createdAt) : new Date();

  /* Source Release > Destination Release  */

  if (sourceCreatedAtTimestamp > destinationCreatedAtTimestamp) {
    console.log(`The source repository is newer than the destination repository. Proceeding with the release.`);
    return {
      status: 200,
      body: 'source release > destnation release',
      latestReleaseRepo: `${source.sourceOrganisation}/${source.sourceRepository}`,
      shortAnswer: 'source',
    };
  }

  /* Destination Release > Source Release  */

  if (destinationCreatedAtTimestamp > sourceCreatedAtTimestamp) {
    console.log(`The destination repository is newer than the source repository. Proceeding with the release.`);
    return {
      status: 200,
      body: 'destnation release > source release',
      latestReleaseRepo: `${destination.destinationOrganisation}/${destination.destinationRepository}`,
      shortAnswer: 'destination',
    };
  }

  return {
    status: 500,
    body: 'error, error, error',
    latestReleaseRepo: null,
    shortAnswer: null,
  };
};

export default compare;
