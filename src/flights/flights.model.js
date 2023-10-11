import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Flight = sequelize.define('flight', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'flight_id'
    },

    originId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'origin_id'
    },

    destinationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'destination_id'
    },

    planeId: {
        type: DataTypes.INTEGER,
        field: 'plane_id',
        allowNull: true
    },

    departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'departure_time'
    },
    
    checkIn: {
        type: DataTypes.DATE,
        field: 'check_in',
        allowNull: true,
    }, 

    status: {
        type: DataTypes.ENUM('pending', 'inProgress', 'done', 'delayed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    }
})

export default Flight


  
  
  
  