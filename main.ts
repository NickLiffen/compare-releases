import { info, setOutput, setFailed } from '@actions/core';
import compare from './utils/compare';
import getInputs from './utils/getInputs';
import query from './utils/query';

const run = async (): Promise<void> => {
  try {
    info('👋 Hello! You are about to compare some releases 🙌');

    /* Getting inputs */

    const [destination, source, token] = await getInputs();

    /* Getting release information from the destination repository */

    const destinationResponse = (await query(
      destination.destinationOrganisation,
      destination.destinationRepository,
      token,
    )) as queryFunctionResponse;

    /* Getting release information from the source repository */

    const sourceResponse = (await query(
      source.sourceOrganisation,
      source.sourceRepository,
      token,
    )) as queryFunctionResponse;

    /* Sending Data to be processed to work out which release is newer */

    const answer = (await compare(destinationResponse, sourceResponse, destination, source)) as compareResponse;

    /* Sending data back to the client */

    setOutput('result', answer);
  } catch (e: any) {
    setFailed(`version-check failure: ${e.message}`);
  }
};

run();

export default run;
