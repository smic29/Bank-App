# Bank-App Project for Avion school
- Ian Sibulo
- Ian De Castro

## Project Requirements

### Features
- [x] app should have a page to display all users
  - Name and balance are visible.
- [x] app should have a page for creating a user using email and password
- [x] app should have a page for deposit/withdraw/transfer

### Error Handling
- [x] wrong_arguments
  - [x] amount cannot be negative
  - [x] name cannot start with a number
- [x] user_already_exists ('Den' == 'den')
- [x] user_does_not_exists ('Den' == 'den')
- [x] not_enough_money
- [ ] sender_does_not_exists
- [x] receiver_does_not_exists

### Budget App
- [ ] budget tracking app that extends bank app by adding a feature that enables a user to add his expense items on his dashboard.
- [ ] add, delete, and list methods for expense items.
- [ ] can add expense item even if the account balance is not enough (just show negative balance)
- [ ] Cost of a specific expense item is deduced to the user's current balance

### 3 Unique features
- [x] Log-in page
- [ ] Transaction History (Deposit/Withdraw/Transfers)
- [ ] Client dashboard