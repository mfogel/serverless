'use strict';

const { expect } = require('chai');
const overrideArgv = require('process-utils/override-argv');
const initialParseArgs = require('../../../../lib/cli/initial-parse-args');

describe('test/unit/lib/cli/initial-parse-args.test.js', () => {
  describe('when commands', () => {
    let data;
    before(() => {
      initialParseArgs.clear();
      data = overrideArgv(
        {
          args: [
            'serverless',
            'cmd1',
            'cmd2',
            '--version',
            'ver',
            '--help',
            'h',
            '--config',
            'conf',
            '-v',
            'elo',
            'other',
          ],
        },
        () => initialParseArgs()
      );
    });

    it('should resolve commands', async () => {
      expect(data.commands).to.deep.equal(['cmd1', 'cmd2', 'ver', 'h', 'other']);
    });

    it('should recognize --version as boolean', async () => {
      expect(data.options.version).to.equal(true);
    });

    it('should recognize --help as boolean', async () => {
      expect(data.options.version).to.equal(true);
    });

    it('should recognize --config', async () => {
      expect(data.options.config).to.equal('conf');
    });

    it('should not recognize -v with command', async () => {
      expect(data.options.v).to.equal('elo');
    });
  });
  describe('when no commands', () => {
    let data;
    before(() => {
      initialParseArgs.clear();
      data = overrideArgv(
        {
          args: ['serverless', '-v', '-h', '-c', 'conf'],
        },
        () => initialParseArgs()
      );
    });

    it('should resolve empty commands list', async () => {
      expect(data.commands).to.deep.equal([]);
    });

    it('should recognize -v alias', async () => {
      expect(data.options.version).to.equal(true);
    });

    it('should recognize --h alias', async () => {
      expect(data.options.help).to.equal(true);
    });

    it('should recognize --c alias', async () => {
      expect(data.options.config).to.equal('conf');
    });
  });
});
