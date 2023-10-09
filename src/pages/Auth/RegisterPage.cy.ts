// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
describe('UI тесты', () => {
  it('Register test', () => {
    cy.visit('/register'); // Перейти на главную страницу вашего приложения

    // Заполнить инпуты
    cy.get('input[name="username"]').type('exampleuser'); // Ввести имя пользователя
    cy.get('input[name="email"]').type('example@example.com'); // Ввести адрес электронной почты
    cy.get('input[name="password"]').type('password123'); // Ввести пароль
    cy.get('input[name="phoneNumber"]').type('+7 (925) 232 22 22'); // Ввести подтверждение пароля

    // Нажать на кнопку регистрации
    cy.get('button[type="submit"]').click();
  });
});
