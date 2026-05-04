import { HModalRef } from './modal-ref';

describe('HModalRef', () => {
  it('emits close reason and result when closed with reason', () => {
    const ref = new HModalRef<string>();

    let closedReason = '';
    let closedResult: string | undefined;

    ref.closed().subscribe((event) => {
      closedReason = event.reason;
      closedResult = event.result;
    });

    ref.closeWithReason('confirm', 'saved');

    expect(closedReason).toBe('confirm');
    expect(closedResult).toBe('saved');
  });

  it('defaults to programmatic reason on close()', () => {
    const ref = new HModalRef<boolean>();

    let closedReason = '';

    ref.closed().subscribe((event) => {
      closedReason = event.reason;
    });

    ref.close(true);

    expect(closedReason).toBe('programmatic');
  });
});
