const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');



