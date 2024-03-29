<?php

namespace App\Enums;

class UserTransactionTypes
{
    public const ContractPay = 1;
    public const Jumpseat = 2;
    public const ContractPenalty = 3;
    public const FuelPenalty = 4;
    public const Bonus = 5;
    public const Rental = 6;
    public const FlightFeesFuel = 7;
    public const FlightFeesGround = 8;
    public const FlightFeesLanding= 9;
    public const AircraftMaintenanceFee = 10;
    public const MonthlyOwnership = 11;
    public const AircraftPurchase = 12;
    public const AircraftSale = 13;
    public const Loan = 14;
    public const LoanPayment = 15;
}
