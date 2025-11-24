import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('ofetch', () => {
  return {
    $fetch: vi.fn()
  }
})

describe('Site Stats API', () => {
  let $fetch: any

  beforeEach(async () => {
    const mod = await import('ofetch')
    $fetch = mod.$fetch
    $fetch.mockClear()
  })

  it('GET /api/site-stats success', async () => {
    const mockStats = { visits: 100 }
    $fetch.mockResolvedValue(mockStats)

    const response = await $fetch('/api/site-stats')

    expect(response).toEqual(mockStats)
  })

  it('GET /api/site-stats failure', async () => {
    $fetch.mockRejectedValue(new Error('Network error'))

    await expect($fetch('/api/site-stats')).rejects.toThrow('Network error')
  })
})
