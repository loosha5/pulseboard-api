import { TargetsService } from './targets.service';

describe('TargetsService (unit)', () => {
  it('createHttpTarget creates a target with expected defaults', () => {
    const service = new TargetsService();

    const target = service.createHttpTarget('google', 'https://www.google.com');

    expect(target.name).toBe('google');
    expect(target.type).toBe('http');
    expect(target.url).toBe('https://www.google.com');
    expect(target.enabled).toBe(true);
    expect(typeof target.id).toBe('string');
    expect(typeof target.createdAt).toBe('string');
  });

  it('listTargets includes created targets', () => {
    const service = new TargetsService();

    service.createHttpTarget('a', 'https://a.com');
    service.createHttpTarget('b', 'https://b.com');

    const targets = service.listTargets();

    expect(targets).toHaveLength(2);
    expect(targets[0].name).toBe('a');
    expect(targets[1].name).toBe('b');
  });
});
