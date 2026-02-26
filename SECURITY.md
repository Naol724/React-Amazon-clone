# Security Guidelines

## Environment Variables

**CRITICAL**: Never commit `.env` files to version control!

### Setup Instructions

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual values in `.env`

3. The `.env` file is in `.gitignore` and will NOT be committed

### Required Environment Variables

- `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (starts with `pk_`)
- `VITE_FIREBASE_*`: Your Firebase configuration values
- `VITE_API_URL`: Your backend API URL

### For Deployment

Set environment variables in your hosting platform (Render, Vercel, etc.) dashboard.
**Never** hardcode secrets in your code.

## Exposed Keys in Git History

⚠️ **IMPORTANT**: If you previously committed `.env` files, your secrets are in git history!

### What to do:

1. **Rotate all exposed credentials immediately**:
   - Generate new Stripe API keys at https://dashboard.stripe.com/apikeys
   - Regenerate Firebase config (if possible) or restrict API key usage
   
2. **Clean git history** (optional, but recommended):
   ```bash
   # This rewrites history - coordinate with team members!
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   
   git push origin --force --all
   ```

3. **Update all environments** with new credentials

## Best Practices

- ✅ Use `.env.example` for documentation
- ✅ Add `.env` to `.gitignore`
- ✅ Use environment variables for all secrets
- ✅ Rotate credentials regularly
- ✅ Use different keys for development/production
- ❌ Never commit `.env` files
- ❌ Never hardcode API keys in code
- ❌ Never share credentials in chat/email
