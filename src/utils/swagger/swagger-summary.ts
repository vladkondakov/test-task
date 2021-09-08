export class SwaggerSummary {
  getAllS(): string {
    return 'Получение всех пользователей без информации о книгах, которыми они владеют.';
  }

  createS(): string {
    return `Создание нового пользователя. Чтобы пройти валидацию: поле email должно быть 
    уникальным адресом электронной почты, firstName и lastName строковыми не менее 2 и не более 20 символов в длину.`;
  }

  updateS(): string {
    return 'Обновление имени и фамилии у пользователя.';
  }

  getUserFullInfoS(): string {
    return 'Обновление имени и фамилии пользователя. Почта не обновляется и служит идентификатором.';
  }

  deleteS(): string {
    return 'Удаление пользователя. Возможно только при условие, что у него нет книг.';
  }

  purchaseSubscriptionS(): string {
    return 'Приобретение абономента.';
  }

  getAllBooksS(): string {
    return 'Get all books';
  }

  createBookS(): string {
    return 'Create a new book';
  }

  getBookS(): string {
    return 'Get information about book';
  }

  giveBookToUserS(): string {
    return 'Give book to user';
  }

  takeBookBackS(): string {
    return 'Take back the book';
  }
}
