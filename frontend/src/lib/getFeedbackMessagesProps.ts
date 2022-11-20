const mapping = {
    validationSignatureFailed: {
        notOk: 'Plik nie jest podpisany/niepoprawny podpis',
        ok: 'Plik jest poprawnie podpisany podpisem elektronicznym'
    },
    validationPdfFailed: {
        notOk: 'Plik nie jest plikiem PDF',
        ok: 'Plik jest plikiem PDF',
    },
    validationCMYKFailed: {
        notOk: 'Plik PDF nie jest w palecie barw CMYK',
        ok: 'Plik PDF jest w palecie barw CMYK'
    },
    validationFormFieldsFailed: {
        notOk: 'Plik PDF zawiera formularz',
        ok: 'Plik PDF nie zawiera formularza'
    },
    validationFontsFailed: {
        notOk: 'Plik PDF nie zawiera dołączonych czcionek',
        ok: 'Plik PDF zawiera dołączone czcionki'
    },
    validationSenderAddressFailed: {
        notOk: 'Niepoprawny adres nadawcy',
        ok: 'Adres nadawcy jest poprawny'
    },
    validationReceiverAddressFailed: {
        notOk: 'Niepoprawny adres odbiorcy',
        ok: 'Adres odbiorcy jest poprawny'
    },
    validationFilenameFailed: {
        notOk: 'Nazwa pliku lub rozszerzenie są niepoprawne',
        ok: 'Nazwa pliku i rozszerzenie są poprawne'
    },
}
// pdf pop, nazwa niep
// Nazwa bądż rozszerzenie zostały naprawione. Pobierz poprawioną wersję pliku PDF

// valid pdp jest ok, correctedFileId nie jest nullem. Skonwertowano plik Worda do PDF. Pobierz go, podpisz i prześlij ponownie

const getFeedbackMessagesProps = (docResponse) => {
    const feedbackList = Object.keys(mapping).reduce((acc, key) => {
        if(!docResponse[key]) {
            return [
                ...acc,
                {
                    message: mapping[key].ok,
                    isOk: true
                }
            ]
        }
        if(docResponse[key]) {
            return [
                ...acc,
                {
                    message: mapping[key].notOk,
                    isOk: false
                }
            ]
        }
        return acc
    }, [] as any[])
    return feedbackList.sort((a, b) => Number(a.isOk) - Number(b.isOk))
}

export default getFeedbackMessagesProps
