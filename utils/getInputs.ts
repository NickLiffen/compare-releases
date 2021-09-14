import { getInput } from '@actions/core';

const getInputs = async (): Promise<Inputs> => {
  const destinationRepository = getInput('destinationRepository');
  const sourceRepository = getInput('sourceRepository');
  const token = getInput('token');

  const [destinationOrg, destinationRepo] = destinationRepository.split('/');
  const [sourceOrg, sourceRepo] = sourceRepository.split('/');

  return [{ destinationOrg, destinationRepo }, { sourceOrg, sourceRepo }, token];
};

export default getInputs;
