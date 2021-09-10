type Inputs = [destination, source, token];

type destination = {
  destinationOrganisation: string;
  destinationRepository: string;
};

type source = {
  sourceOrganisation: string;
  sourceRepository: string;
};

type token = string;

type queryFunctionResponse = {
  isLatest: boolean;
  isPrerelease: boolean;
  createdAt: string | null;
};

type queryResponse = {
  repository: {
    releases: {
      nodes: queryFunctionResponse[];
    };
  };
};

type compareResponse = {
  status: number;
  body: string;
  latestReleaseRepo: string | null;
  shortAnswer: string | null;
};
