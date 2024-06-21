using System;
using System.Collections.Concurrent;

namespace Jagoda.Server.Services
{
    public class TokenBlacklistService
    {
        private readonly ConcurrentDictionary<string, DateTime> _blacklist = new();

        public void AddTokenToBlacklist(string token, DateTime expiration)
        {
            _blacklist[token] = expiration;
        }

        public bool IsTokenBlacklisted(string token)
        {
            return _blacklist.ContainsKey(token);
        }

        public void Cleanup()
        {
            var now = DateTime.UtcNow;
            foreach (var item in _blacklist)
            {
                if (item.Value < now)
                {
                    _blacklist.TryRemove(item.Key, out _);
                }
            }
        }
    }
}
