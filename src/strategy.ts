// Let's suppose that we are making some amount formatter by country
// It means that in different cases we could switch our number value to one that is more common to some country
// example in italy we would use `{number}`
// example in us we would use `{number}.{decimals}` and so one


namespace Strategy {
  // First we declare our interface that will describe our strategies
  interface ICurrency {
    formatCurrency(value: number): string;
  }

  // Now we describe our context that will work with strategy
  class CurrencyFormatter {
    strategy!: ICurrency;
    constructor() {}

    setStrategy(strategy: ICurrency) {
      this.strategy = strategy;
    }

    format(value: number) {
      return this.strategy.formatCurrency(value);
    }
  }

  // This is concrete strategy that we would pass in our context
  class ITCurrency implements ICurrency {
    formatCurrency(value: number): string {
      return `${value} EUR`;
    }
  }

  // This is concrete strategy that we would pass in our context
  class USCurrency implements ICurrency {
    formatCurrency(value: number): string {
      return `${value} $`;
    }
  }

  class ROCurrency implements ICurrency {
    formatCurrency(value: number): string {
      return `${value} RON`;
    }
  }

  // Now we could keep same logic but just change strategy
  const main = (strategy: ICurrency) => {
    const currency = new CurrencyFormatter();

    currency.setStrategy(strategy);
    console.log(strategy, currency.format(100));
  };

  main(new USCurrency());
  main(new ITCurrency());
  main(new ROCurrency());
}
