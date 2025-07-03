export const formatCreatedAt = (timestamp: string) => {
    const now = new Date()
    const time = new Date(Number(timestamp))
    const seconds = Math.floor((now.getTime() - time.getTime()) / 1000)

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return rtf.format(-minutes, 'minute')
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return rtf.format(-hours, 'hour')
    const days = Math.floor(hours / 24)
    if (days < 7) return rtf.format(-days, 'day')
    const weeks = Math.floor(days / 7)
    if (weeks < 4) return rtf.format(-weeks, 'week')
    const months = Math.floor(days / 30)
    if (months < 12) return rtf.format(-months, 'month')
    const years = Math.floor(days / 365)
    return rtf.format(-years, 'year')
  }


export const isTestAccount = (username: string, password: string) => {
    return( username === 'demo@example.com' && password === 'password123') ||
           (username === 'test@user.com' && password === 'testpass');
    
  }