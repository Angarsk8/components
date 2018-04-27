const path = require('path')
const getRegistryRoot = require('../getRegistryRoot')
const getTmpDir = require('../fs/getTmpDir')
const getComponentRootPath = require('./getComponentRootPath')

describe('#getComponentRootPath()', () => {
  it('should return a registry path if "type" parameter does not include path information', async () => {
    const type = 'function-mock'
    const res = await getComponentRootPath(type)
    const expected = path.join(getRegistryRoot(), type)
    expect(res).toEqual(expected)
  })

  it('should detect if "type" parameter includes path to local file system', async () => {
    const type = './my-custom-component'
    const res = await getComponentRootPath(type)
    const expected = path.resolve(type)
    expect(res).toEqual(expected)
  })

  describe('when no component "type" propert parameter is provided', () => {
    let oldCwd
    let tmpDirPath

    beforeEach(async () => {
      tmpDirPath = await getTmpDir()
      oldCwd = process.cwd()
      process.chdir(tmpDirPath)
    })

    afterEach(() => {
      process.chdir(oldCwd)
    })

    it('should default to the cwd if no parameter is provided', async () => {
      const res = await getComponentRootPath()
      expect(res).toEqual(tmpDirPath)
    })
  })
})
