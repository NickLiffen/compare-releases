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
      destination.destinationOrg,
      destination.destinationRepo,
      token,
    )) as queryFunctionResponse;

    /* Getting release information from the source repository */

    const sourceResponse = (await query(source.sourceOrg, source.sourceRepo, token)) as queryFunctionResponse;

    /* Sending Data to be processed to work out which release is newer */
    
    const repo = (await compare(destinationResponse, sourceResponse, destination, source)) as string;

    /* Sending data back to the client */

    setOutput('repo', repo);
    setOutput('tagName', destinationResponse.tagName);
  } catch (e: any) {
    setFailed(`version-check failure: ${e.message}`);
  }
};

run();

export default run;
