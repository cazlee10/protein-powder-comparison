const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupAdmin() {
  try {
    // Check if admin user already exists
    const { data: existingUsers, error: fetchError } = await supabase.auth.admin.listUsers()
    
    if (fetchError) {
      console.error('Error fetching users:', fetchError)
      return
    }

    const adminEmail = 'admin@example.com' // Change this to your desired admin email
    const adminPassword = 'admin123456' // Change this to your desired admin password

    const existingAdmin = existingUsers.users.find(user => user.email === adminEmail)
    
    if (existingAdmin) {
      console.log('Admin user already exists:', adminEmail)
      return
    }

    // Create admin user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    })

    if (createError) {
      console.error('Error creating admin user:', createError)
      return
    }

    console.log('Admin user created successfully!')
    console.log('Email:', adminEmail)
    console.log('Password:', adminPassword)
    console.log('User ID:', newUser.user.id)
    
    console.log('\n⚠️  IMPORTANT: Change the default password after first login!')
    
  } catch (error) {
    console.error('Setup failed:', error)
  }
}

setupAdmin() 