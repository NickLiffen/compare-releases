const compare = async (
  destinationResponse: queryFunctionResponse,
  sourceResponse: queryFunctionResponse,
  destination: destination,
  source: source,
): Promise<string> => {
  if (destinationResponse.createdAt === null) {
    console.log(
      `There are no release(s) on the following repository: ${destination.destinationOrg}/${destination.destinationRepo}. Nothing to compare`,
    );
    throw new Error(
      `There are no release(s) on the following repository: ${destination.destinationOrg}/${destination.destinationRepo}. Nothing to compare`,
    );
  }

  /* Maybe this logic could be changed (pre-release)? Basically if this isn't the latest release I would guess it's something wrong with my query */

  if (!destinationResponse.isLatest || destinationResponse.isPrerelease) {
    console.log(
      `The latest release of ${destination.destinationOrg}/${destination.destinationRepo} repository is either a pre-release of not the latest version. eek!`,
    );
    throw new Error(
      `The latest release of ${destination.destinationOrg}/${destination.destinationRepo} repository is either a pre-release of not the latest version. eek!`,
    );
  }

  /* Maybe this logic could be changed (pre-release)? Basically if this isn't the latest release I would guess it's something wrong with my query */

  if (!sourceResponse.isLatest || sourceResponse.isPrerelease) {
    console.log(
      `The latest release of ${source.sourceOrg}/${source.sourceRepo} repository is either a pre-release of not the latest version. eek!`,
    );
    throw new Error(
      `The latest release of ${source.sourceOrg}/${source.sourceRepo} repository is either a pre-release of not the latest version. eek!`,
    );
  }

  /* Printing out the timestamps for people can manualy validate if they like */

  console.log(`The timestamp of the destination repository is: ${destinationResponse.createdAt}`);
  console.log(`The timestamp of the source repository is: ${sourceResponse.createdAt}`);

  /* If there is a release in the destination, but not the source, tedhnically the source is beheind, which means we are going to report back true  */

  if (!sourceResponse.createdAt && destinationResponse.createdAt) {
    console.log(
      'There is no release on the source repository, but there is one on the release, destination repo ahead.',
    );
    return `${destination.destinationOrg}/${destination.destinationRepo}`;
  }

  /* Converting to timestamps for conversation  */

  const sourceCreatedAtTimestamp = sourceResponse.createdAt ? new Date(sourceResponse.createdAt) : new Date();
  const destinationCreatedAtTimestamp = sourceResponse.createdAt ? new Date(sourceResponse.createdAt) : new Date();

  /* Source Release > Destination Release  */

  if (sourceCreatedAtTimestamp > destinationCreatedAtTimestamp) {
    console.log(`The source repository is newer than the destination repository. Proceeding with the release.`);
    return `${source.sourceOrg}/${source.sourceRepo}`;
  }

  /* Destination Release > Source Release  */

  if (destinationCreatedAtTimestamp > sourceCreatedAtTimestamp) {
    console.log(`The destination repository has a release newer then the source repository`);
    return `${destination.destinationOrg}/${destination.destinationRepo}`;
  }

  throw new Error(`Something went wrong. Got to a stage which it shouldn't have.`);
};

export default compare;
