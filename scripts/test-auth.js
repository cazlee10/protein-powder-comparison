const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testAuth() {
  try {
    console.log('Testing authentication setup...\n')

    // List all users
    const { data: users, error: fetchError } = await supabase.auth.admin.listUsers()
    
    if (fetchError) {
      console.error('Error fetching users:', fetchError)
      return
    }

    console.log(`Found ${users.users.length} user(s):`)
    users.users.forEach(user => {
      console.log(`- ${user.email} (ID: ${user.id})`)
      if (user.user_metadata?.role) {
        console.log(`  Role: ${user.user_metadata.role}`)
      }
    })

    // Test admin user login
    const adminEmail = 'admin@example.com'
    const adminPassword = 'admin123456'

    console.log('\nTesting admin login...')
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword
    })

    if (authError) {
      console.error('Login failed:', authError.message)
      return
    }

    console.log('✅ Admin login successful!')
    console.log('User ID:', authData.user.id)
    console.log('Email:', authData.user.email)
    console.log('Session expires:', new Date(authData.session.expires_at * 1000).toLocaleString())

    // Sign out
    await supabase.auth.signOut()
    console.log('\n✅ Sign out successful')

    console.log('\n🎉 Authentication setup is working correctly!')
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testAuth() 