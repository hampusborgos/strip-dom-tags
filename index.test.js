import stripTags from './stripTags'

const evil =
  "<i>Here:</i> <b onclick='javascript:alert(1)'>is</b> <img onload='alert(1)' src='https://www.obos.no/Images/obos_liggende.svg' alt='trolololo'>evil!!<b></b><script>alert(2)</script>"

describe('stripTags', () => {
  it('Nothing to strip, do nothing', () => {
    expect(stripTags('You got a hit in your search')).toBe('You got a hit in your search')
  })

  it('Strips all tags when passed nothing', () => {
    expect(stripTags(evil)).toBe('Here: is evil!!alert(2)')
  })

  it('Strips only whitelisted tag', () => {
    expect(stripTags(evil, ['b'])).toBe('Here: <B>is</B> evil!!<B/>alert(2)')
  })

  it('Strips all attributes', () => {
    expect(stripTags(evil, ['b', 'i', 'img'])).toBe(
      '<I>Here:</I> <B>is</B> <IMG/>evil!!<B/>alert(2)',
    )
  })

  it('Dont allow JS even if whitelisted', () => {
    expect(stripTags(evil, ['b'], ['onclick'])).toBe('Here: <B>is</B> evil!!<B/>alert(2)')
  })

  it('Allow image sources', () => {
    expect(stripTags(evil, ['img'], ['src', 'alt'])).toBe(
      'Here: is <IMG src="https://www.obos.no/Images/obos_liggende.svg" alt="trolololo"/>evil!!alert(2)',
    )
  })
})
