import React from 'react'      // page for choose logins (customer,staft,Admin)



function LoginPage() {
  return (
    <div className="logincontainer">
      <a href="/customer-login" className={styles.loginboxcustomer}>
        Customer Login
      </a>
      <a href="/staff-login" className={styles.loginboxstaff}>
        Staff Login
      </a>
      <a href="/admin-login" className={styles.loginboxadmin}>
         Administrator Login
      </a>
      
    </div>
  )
}

export default LoginPage