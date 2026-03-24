import { Test, TestingModule } from '@nestjs/testing'
import { EnvConfigService } from '../../env-config.service'
import { EnvConfigModule } from '../../env-config.module'

describe('EnvConfigService Unit Tests', () => {
  let sut: EnvConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile()

    sut = module.get<EnvConfigService>(EnvConfigService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should get env var', () => {
    const env = sut.getNodeEnv()
    expect(env).toBe('test')
  })

  it('should get port', () => {
    const port = sut.getAppPort()
    expect(port).toBe(3333)
  })
})
