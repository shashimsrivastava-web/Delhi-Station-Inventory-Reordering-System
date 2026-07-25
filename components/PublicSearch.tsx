'use client';
import React, { useState, useMemo } from 'react';
import { Search, LogIn } from 'lucide-react';
import { StockMaster } from '@/lib/db';
import { fuzzySearch } from '@/lib/search';

export default function PublicSearch({ 
    stockMaster, 
    onLoginClick 
}: { 
    stockMaster: StockMaster[], 
    onLoginClick: () => void
}) {
    const [query, setQuery] = useState('');
    
    const results = useMemo(() => {
        if (!query) return [];
        return fuzzySearch(query, stockMaster);
    }, [query, stockMaster]);

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Inventory Search Portal</h1>
                    <button 
                        onClick={onLoginClick}
                        className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-3 py-1.5 rounded-md transition shadow-sm cursor-pointer"
                    >
                        <LogIn className="w-3.5 h-3.5" />
                        Sign In
                    </button>
                </div>
                
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-3 text-slate-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search articles by name, number, or barcode..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                
                <div className="space-y-4">
                    {results.map(({ item }) => {
                        return (
                            <div key={item.article_number} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                                <h2 className="font-bold text-lg text-slate-900">{item.description}</h2>
                                <p className="text-sm text-slate-500 font-mono mb-2">#{item.article_number}</p>
                                
                                <div className="flex gap-4 items-center">
                                    <div className="text-sm font-semibold text-amber-800">
                                        Total Stock: {(item.total_stock_quantity ?? 0).toLocaleString()} {item.smallest_unit_name ?? 'unit'}s
                                    </div>
                                    <div className="text-sm font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                                        Loc: {item.location || 'UNALLOCATED'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
