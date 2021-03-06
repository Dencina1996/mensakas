<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $phone
 * @property string $created_at
 * @property string $updated_at
 * @property CustomerAddress[] $customerAddresse
 */
class Customer extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'customer';

    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['first_name', 'last_name', 'email', 'phone', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function customerAddresse()
    {
        return $this->hasOne('App\CustomerAddress');
    }

    public function scopeFilter($query, $params) {
        if (isset($params['search']) && trim($params['search'] !== '')) {
            $columns = $this->fillable;
            foreach ($columns as $key => $column) {
                if ($key === array_key_first($columns)) {
                    $query->where($column, 'LIKE', '%' . $params['search'] . '%');
                } else {
                    $query->orWhere($column, 'LIKE', '%' . $params['search'] . '%');
                }
            }
        }
        return $query;
    }
}
