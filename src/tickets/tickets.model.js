import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Ticket = sequelize.define(
  "tickets",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },

    passengerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "passenger_id",
    },

    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "flight_id",
    },

    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "booking_id",
    },

    class: {
      type: DataTypes.ENUM("economic", "executive", "first"),
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "seat_number",
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "created_id",
    },

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["seat_number", "flight_id"],
      },
    ],
  }
);

export default Ticket;
