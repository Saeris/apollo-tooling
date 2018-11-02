import { GraphQLProject } from "./base";
import { LoadingHandler } from "../loadingHandler";
import { FileSet } from "../fileSet";
import { ServiceConfigFormat, getServiceName } from "../config";

export function isServiceProject(
  project: GraphQLProject
): project is GraphQLServiceProject {
  return project instanceof GraphQLServiceProject;
}

export class GraphQLServiceProject extends GraphQLProject {
  constructor(
    config: ServiceConfigFormat,
    loadingHandler: LoadingHandler,
    rootPath: string
  ) {
    const fileSet = new FileSet({
      rootPath,
      includes: config.service.includes,
      excludes: config.service.excludes
    });

    super(config, fileSet, loadingHandler);
    this.config = config;
  }

  get displayName() {
    return getServiceName(this.config);
  }

  initialize() {
    return [];
  }

  validate() {}
}
