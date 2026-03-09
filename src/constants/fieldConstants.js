// Field Types
export const FIELD_TYPES = {
  INT: 'int',
  SMALLINT: 'smallint',
  BIGINT: 'bigint',
  FLOAT: 'float',
  DECIMAL: 'decimal',
  TEXT: 'text',
  VARCHAR: 'varchar',
  CHAR: 'char',
  JSON: 'json',
  BLOB: 'blob',
  DATETIME: 'datetime',
  TIMESTAMP: 'timestamp',
};

// Field Type Categories
export const NUMERIC_TYPES = ['int', 'smallint', 'bigint', 'float', 'decimal'];
export const INTEGER_TYPES = ['int', 'smallint', 'bigint'];
export const TEXT_TYPES = ['text', 'varchar', 'char'];
export const STRING_TYPES = ['varchar', 'char', 'varbinary'];
export const VARIABLE_LENGTH_TYPES = ['varchar', 'char', 'varbinary'];
export const DATETIME_TYPES = ['datetime', 'timestamp'];
export const NON_INDEXABLE_TYPES = ['text', 'blob', 'json'];
export const NON_PRIMARY_TYPES = ['text', 'blob', 'json'];
export const NON_DEFAULT_VALUE_TYPES = ['datetime', 'timestamp', 'text', 'blob', 'json'];

// Index Types
export const INDEX_TYPES = {
  BTREE: 'btree',
  FULLTEXT: 'fulltext',
  HASH: 'hash',
};

// Engine Types
export const ENGINE_TYPES = {
  INNODB: 'innodb',
  MEMORY: 'memory',
};

// Resource Types
export const RESOURCE_TYPES = {
  DEFAULT: 'default',
  CHECKOUT: 'checkout',
  SALES: 'sales',
};

// Foreign Key Actions
export const FK_ACTIONS = {
  CASCADE: 'CASCADE',
  SET_NULL: 'SET NULL',
  NO_ACTION: 'NO ACTION',
};

// Default Values
export const DEFAULT_FIELD_VALUE = {
  name: '',
  type: FIELD_TYPES.VARCHAR,
  length: 255,
  identity: false,
  unsigned: false,
  nullable: false,
  primary: false,
  defaultValue: '',
  on_update: false,
  comment: '',
};

export const DEFAULT_FOREIGN_KEY = {
  currentColumn: '',
  referenceTable: '',
  referenceColumn: '',
  onDelete: FK_ACTIONS.CASCADE,
};

export const DEFAULT_UNIQUE_KEY = {
  uniqueColumns: '',
};

export const DEFAULT_INDEX = {
  columnsToIndex: '',
  indexType: INDEX_TYPES.BTREE,
};

// Time Defaults
export const TIME_DEFAULTS = {
  ZERO: '0',
  CURRENT_TIMESTAMP: 'CURRENT_TIMESTAMP',
};

export const TIME_DEFAULT_OPTIONS = [
  { value: '', label: 'No Default Value' },
  { value: TIME_DEFAULTS.ZERO, label: '0000-00-00 00:00:00' },
  { value: TIME_DEFAULTS.CURRENT_TIMESTAMP, label: 'Current Timestamp' },
];

// Precision and Scale
export const DECIMAL_PRECISION = {
  MIN: 1,
  MAX: 65,
  DEFAULT: 10,
};

export const DECIMAL_SCALE = {
  MIN: 0,
  MAX: 30,
  DEFAULT: 0,
};

// Length constraints
export const LENGTH_CONSTRAINTS = {
  MIN: 1,
  MAX: 65535,
  DEFAULT: 255,
};
