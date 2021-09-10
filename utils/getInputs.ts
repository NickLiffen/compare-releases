import { getInput } from '@actions/core';

const getInputs = async (): Promise<Inputs> => {
  const destinationOrganisation = getInput('destinationOrganisation');
  const destinationRepository = getInput('destinationRepository');
  const sourceOrganisation = getInput('sourceOrganisation');
  const sourceRepository = getInput('sourceRepository');
  const token = getInput('token');

  return [{ destinationOrganisation, destinationRepository }, { sourceOrganisation, sourceRepository }, token];
};

export default getInputs;
