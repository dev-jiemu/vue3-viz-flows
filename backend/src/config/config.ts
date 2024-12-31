import { readFileSync } from 'fs';
import * as yaml from 'js-yaml'

const phase = process.env.NODE_ENV

const yamlConfig: Record<string, any> = yaml.load(
  readFileSync(`${process.cwd()}/config/config.yaml`, 'utf8'),
)

export default () => ({
  ...yamlConfig
})