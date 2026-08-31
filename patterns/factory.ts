interface IInsurance {
  id: string;
  status: string;
  setVehicle(vehicle: any): void;
  submit(): Promise<boolean>;
}

class TFInsurance implements IInsurance {
  id!: string;
  status!: string;
  private vehicle: any;
  setVehicle(vehicle: any): void {
    this.vehicle = vehicle;
  }
  async submit(): Promise<boolean> {
    const res = await fetch("", {
      method: "POST",
      body: JSON.stringify({ vehicle: this.vehicle }),
    });
    const data = await res.json();
    return data.isSuccess;
  }
}

class ABInsurance implements IInsurance {
  id!: string;
  status!: string;
  private vehicle: any;
  setVehicle(vehicle: any): void {
    this.vehicle = vehicle;
  }
  async submit(): Promise<boolean> {
    const res = await fetch("another", {
      method: "POST",
      body: JSON.stringify({ vehicle: this.vehicle }),
    });
    const data = await res.json();
    return data.isSuccess;
  }
}

abstract class InsuranceFactory {
  db: any;
  abstract createInsurance(): IInsurance;

  saveHistory(ins: IInsurance) {
    this.db.save(ins.id, ins.status);
  }
}

class TFInsuranceFactory extends InsuranceFactory {
  createInsurance(): IInsurance {
    return new TFInsurance();
  }
}

class ABInsuranceFactory extends InsuranceFactory {
  createInsurance(): IInsurance {
    return new ABInsurance();
  }
}

const INSURANCE_TYPE = {
  tf: TFInsurance,
  ab: ABInsurance,
};

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt {
  db: any;
  createInsurance<T extends keyof IT>(type: T): IT[T] {
    return INSURANCE_TYPE[type];
  }

  saveHistory(ins: IInsurance) {
    this.db.save(ins.id, ins.status);
  }
}

export {};
