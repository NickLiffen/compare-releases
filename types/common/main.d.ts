type Inputs = [destination, source, token];

type destination = {
  destinationOrg: string;
  destinationRepo: string;
};

type source = {
  sourceOrg: string;
  sourceRepo: string;
};

type token = string;

type queryFunctionResponse = {
  isLatest: boolean;
  isPrerelease: boolean;
  createdAt: string | null;
  tagName: string;
};

type queryResponse = {
  repository: {
    releases: {
      nodes: queryFunctionResponse[];
    };
  };
};
